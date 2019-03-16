import { expect, use as chaiUse } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { of } from 'rxjs';
import * as sinonChai from 'sinon-chai';
import * as sinon from 'ts-sinon';
import { ApplicationEnvironment } from '../src/domain';
import { DataStream, StreamFactory, Coder } from '../src/persistency';
import {
    ApplicationEnvironmentRepository
} from '../src/persistency/ApplicationEnvironmentRepository';
import { createApplicationEnvironment, createId } from './Fixture';
chaiUse(sinonChai);
chaiUse(chaiAsPromised);

describe('ApplicationEnvironmentRepository', () => {
    describe('get', () => {
        describe('given a persisted application environment', () => {
            let id: string;
            let appEnv: ApplicationEnvironment;
            let stubbedStream: DataStream;
            let stubbedStreamFactory: StreamFactory<DataStream>;
            let stubbedCoder: Coder<string>;
            let repo: ApplicationEnvironmentRepository;
            beforeEach(() => {
                // Arrange
                id = createId();
                appEnv = createApplicationEnvironment(id);
                stubbedStream = sinon.stubInterface<DataStream>({read: of('appEnv')});
                stubbedStreamFactory =
                    sinon.stubInterface<StreamFactory<DataStream>>({create: stubbedStream});
                stubbedCoder = sinon.stubInterface<Coder<string>>({decode: appEnv});
                repo = new ApplicationEnvironmentRepository(stubbedStreamFactory, stubbedCoder);
            });
            describe('when called with id of persisted application environment', () => {
                it('should return corresponding application environment', async () => {
                    // Act
                    const res = await repo.get(id).toPromise();
                    // Assert
                    expect(res).to.be.equal(appEnv);
                });
            });
            describe('when called with non-existent id', () => {
                it('should throw an error', () => {
                    const nonExistingId = createId();
                    stubbedStream.read = () => {
                        throw new Error('No file found');
                    };
                    // Act
                    return expect(repo.get(nonExistingId).toPromise())
                        // Assert
                        .to.be.rejectedWith(Error, new RegExp(`id.*${nonExistingId}`));
                });
            });
        });
    });
});
