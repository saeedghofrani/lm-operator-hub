import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { FirebaseController } from './firebase.controller';
@Module({
  imports: [],
  controllers: [FirebaseController],
  providers: [FirebaseService],
  exports: [FirebaseService]
})

export class FirebaseModule { }