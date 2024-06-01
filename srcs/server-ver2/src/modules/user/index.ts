export * from './user.service';
export * from './user.controller';
export * from './user.module';

import {Profile as GoogleProfile} from 'passport-google-oauth20';
import {Profile as FacebookProfile} from 'passport-facebook';

export type TProfile = GoogleProfile | FacebookProfile;
