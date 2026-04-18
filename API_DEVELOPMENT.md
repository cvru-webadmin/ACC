# API Development & Swagger Integration Guide

This guide provides a comprehensive walkthrough for developing scalable APIs with NestJS, Prisma, and integrating Swagger for professional documentation.

---

## 🚀 1. API Development Lifecycle

Follow these structured steps to build any new feature or resource.

### Step 1: Resource Generation
Use the NestJS CLI to scaffold a complete resource (Controller, Service, Entity, DTOs).
```bash
npx nest generate resource modules/<resource-name>
```
*Choose **REST API** and **Yes** to generating CRUD entry points.*

### Step 2: Define the Prisma Model
Add your model to `prisma/schema.prisma`.
```prisma
model YourModel {
  id        String   @id @default(uuid())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```
Run synchronization:
```bash
npm run push      # Sync with DB
npm run generate  # Update Prisma Client Types
```

### Step 3: Define DTOs (Data Transfer Objects)
Located in `src/modules/<resource>/dto/`. Use `class-validator` for runtime validation.

**Example: `create-resource.dto.ts`**
```typescript
import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResourceDto {
  @ApiProperty({ example: 'My New Resource', description: 'The name of the resource' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}
```

### Step 4: Implement the Service
Handle business logic and database interactions via `PrismaService`.

### Step 5: Implement the Controller
Handle routing, HTTP status codes, and link to Swagger documentation.

---

## 📚 2. Swagger (OpenAPI) Setup

### 📦 Installation
Install the required packages:
```bash
npm install --save @nestjs/swagger
```

### ⚙️ Configuration
Update `src/main.ts` to initialize Swagger.

```typescript
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Validation Logic
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // 2. Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('ACC API Gateway')
    .setDescription('The Core API documentation for the ACC Project')
    .setVersion('1.0')
    .addBearerAuth() // If using JWT
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Application is running on: http://localhost:3000/api/docs`);
}
bootstrap();
```

---

## 🎨 3. Documenting Your APIs

To make your Swagger documentation premium, use these decorators in your Controllers.

| Decorator | Description |
| :--- | :--- |
| `@ApiTags('Name')` | Groups endpoints in the UI. |
| `@ApiOperation({ summary: '...' })` | Brief description of the endpoint. |
| `@ApiResponse({ status: 201, description: '...' })` | Documents possible responses. |
| `@ApiProperty()` | Documents DTO fields (required for Swagger UI to show models). |
| `@ApiBearerAuth()` | Marks an endpoint as requiring authentication. |

### Example Controller Implementation
```typescript
@ApiTags('Members')
@Controller('members')
export class MemberController {
  
  @Post()
  @ApiOperation({ summary: 'Create a new member' })
  @ApiResponse({ status: 201, description: 'Member successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }
}
```

---

## 🛠️ 4. Best Practices

1.  **Use HSL Colors for Visuals**: If building any UI for documentation, stick to consistent palettes.
2.  **DTO Whitelisting**: Always use `whitelist: true` in `ValidationPipe` to prevent malicious payloads.
3.  **Unique IDs**: Ensure all DTO fields and API tags are descriptive.
4.  **Error Handling**: Create custom exceptions for consistent API responses.
