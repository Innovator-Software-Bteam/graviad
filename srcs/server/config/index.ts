import {configSequelize} from './database.config';
import {configSwagger} from './swagger.config';
import {configPassport} from './passport.config';

// export * from './database.config';
export * from './swagger.config';
export * from './passport.config';
export * from './graviad.config';


export const config = () => {
    configSequelize();
    configSwagger();
    configPassport();
};
