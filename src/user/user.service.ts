import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const {name, email, password, role} = createUserDto;
    const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role:role ?? 'AGENT',
      },
    });
    return user;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async login(loginDto: LoginDto) {
    const {email, password} = loginDto;
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if(!user) {
      throw new NotFoundException('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);
    return { user, token };
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
