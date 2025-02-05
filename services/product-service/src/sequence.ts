import {HttpErrors, MiddlewareSequence, RequestContext} from '@loopback/rest';
import dotenv from 'dotenv';
dotenv.config();

export class MySequence extends MiddlewareSequence {
  async handle(context: RequestContext): Promise<void> {
    // validate for allowed origins from env
    const {request, response} = context;
    const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',');
    // console.log({request});
    const origin = request.headers.origin || '';
    // if (!origin) throw new HttpErrors.Forbidden(`NO Origin`);

    if (allowedOrigins.includes(origin)) {
      response.setHeader('Access-Control-Allow-Origin', origin);
    } else {
      response.setHeader('Access-Control-Allow-Origin', 'null');
    }

    return super.handle(context);
  }
}
