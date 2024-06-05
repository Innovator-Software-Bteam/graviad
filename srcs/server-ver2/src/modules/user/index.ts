export * from './user.service';
export * from './user.interface';
export * from './user.controller';
export * from './user.module';
export * from './dto';
export * from './entities';

import {Profile as GoogleProfile} from 'passport-google-oauth20';
import {Profile as FacebookProfile} from 'passport-facebook';

export type TProfile = GoogleProfile | FacebookProfile;
