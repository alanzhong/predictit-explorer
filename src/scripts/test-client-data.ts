import { dumpClientDataToS3 } from '../backend/lambda/handlers/client-data';

dumpClientDataToS3().catch(err => console.log(err));
