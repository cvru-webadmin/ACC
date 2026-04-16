# Development Guide: Creating Models & APIs

Follow these steps to add new features to your backend.

## 1. Update the Database Schema
Open `prisma/schema.prisma` and add your model.

**Example: Adding a Post model**
```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  String
  author    User     @relation(fields: authorId], references: [id])
}

// Update User model to have relation
model User {
  id    String @id @default(uuid())
  posts Post[]
  // ... other fields
}
```

## 2. Sync and Update Client
Every time you change the schema, run these commands:

1.  **Sync to Supabase**: `npx prisma db push`
2.  **Update Types**: `npx prisma generate`

## 3. Create an API (NestJS)
To create a new API endpoint, follow this pattern:

### A. Create a Service
```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getAllPosts() {
    return this.prisma.post.findMany(); // 'post' is generated from your model name
  }
}
```

### B. Create a Controller
```typescript
import { Controller, Get } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async getPosts() {
    return this.postService.getAllPosts();
  }
}
```

## 4. Helpful Tips
- **Naming**: Prisma model names (e.g., `User`) become lowercase in code (`prisma.user`).
- **Validation**: Use `class-validator` in your DTOs for incoming API data.
- **Async/Await**: Always use `async/await` when calling database functions.
- **Check Connections**: If the DB is not connecting, check if your IP is allowed in Supabase settings or if your project is paused.
