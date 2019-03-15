import { StreamFactory, DataStream } from '.';
import { ApplicationEnvironment } from '../domain';

export class ApplicationEnvironmentRepository {

    private streams: Map<string, DataStream>;

    constructor(private streamFactory: StreamFactory) {
        this.streams = new Map<string, DataStream>();
     }

    public async get(id: string): Promise<ApplicationEnvironment> {
        throw new Error('Not implemented')
        if (!this.streams.has(id)) {
            const stream = this.streamFactory.create(id);
            this.streams.set(id, stream);
            //return stream.read().toPromise();
        }
        const res = await this.streams.get(id);
        if (!res) {
            throw new Error(`Unknown id: ${id}`);
        }
        //return res.read().toPromise();
    }
}
