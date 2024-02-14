import {
    BadRequestException,
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'

export const generateRandom = (digit: number) => {
    return Math.random().toFixed(digit).split('.')[1]
}

@Injectable()
export class FilesToBodyInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp()
        const req = ctx.getRequest()
        if (req.body && Array.isArray(req.files) && req.files.length) {
            if (req.files.length > 10) {
                throw new BadRequestException('Max File Limit Reach')
            }
            req.files.forEach((file: Express.Multer.File) => {
                if (file.size > 1024 * 1024 * 10) {
                    throw new BadRequestException('File is too large')
                }
                if (!Boolean(file.mimetype.match(/(jpg|jpeg|png|gif)/))) {
                    throw new BadRequestException('Unknown file formate')
                }
            })
        }
        return next.handle()
    }
}
