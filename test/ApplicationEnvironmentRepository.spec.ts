import { expect, use as chaiUse } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { of } from 'rxjs';
import * as sinonChai from 'sinon-chai';
import * as sinon from 'ts-sinon';
import { ApplicationEnvironment } from '../src/domain';
import { DataStream, StreamFactory } from '../src/persistency';
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
            let repo: ApplicationEnvironmentRepository;
            beforeEach(() => {
                // Arrange
                id = createId();
                appEnv = createApplicationEnvironment(id);
                stubbedStream = sinon.stubInterface<DataStream>({read: of(appEnv)});
                stubbedStreamFactory =
                    sinon.stubInterface<StreamFactory<DataStream>>({create: stubbedStream});
                repo = new ApplicationEnvironmentRepository(stubbedStreamFactory);
            });
            describe('when called with id of persisted application environment', () => {
                it('should return corresponding application environment', async () => {
                    // Act
                    const res = await repo.get(id);
                    // Assert
                    expect(res).to.be.equal(appEnv);
                });
            });
            describe('when called with the same id multiple times', () => {
                it('should only load the loader once', async () => {
                    // Act
                    await repo.get(id);
                    await repo.get(id);
                    // Assert
                    expect(stubbedStream.read).to.be.calledOnce;
                });
            });
            describe('when called with non-existent id', () => {
                it('should throw an error', () => {
                    const nonExistingId = createId();
                    // Act
                    return expect(repo.get(nonExistingId))
                        // Assert
                        .to.be.rejectedWith(Error, new RegExp(`id.*${nonExistingId}`));
                });
            });
        });
    });
});
