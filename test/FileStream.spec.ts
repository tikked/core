import { expect, use as chaiUse } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { FSWatcher } from 'fs';
import { Subscription } from 'rxjs';
import { SinonSpy, spy } from 'sinon';
import * as sinonChai from 'sinon-chai';
import { stubInterface } from 'ts-sinon';
import { FileStream } from '../src/persistency/FileStream';
import { createApplicationEnvironment } from './Fixture';
chaiUse(sinonChai);
chaiUse(chaiAsPromised);

describe('FileStream', () => {
    describe('constructor', () => {
        describe('given valid coder', () => {
            // Arrange
            const appEnv = createApplicationEnvironment();

            describe(`when called with empty file path`, () => {
                it('should throw an error', () => {
                    // Act
                    expect(() => {
                        const res = new FileStream('');
                    })
                        // Assert
                        .to.throw('empty');
                });
            });
        });
    });

    describe('read', () => {
        describe('given existing file', () => {
            let stream: FileStream;
            const fileName = 'some-test-file';
            const fileContent = 'some content';
            beforeEach(async () => {
                stream = new FileStream(
                    fileName,
                    fp => fp === fileName
                        ? Promise.resolve(fileContent)
                        : Promise.reject(new Error(`Unknown file ${fp}`)),
                    (fp, watcher) => stubInterface<FSWatcher>(),
                    (fp, content) => Promise.resolve());
            });
            describe('when listener is attached', () => {
                let sub: Subscription;
                let next: SinonSpy;
                let error: SinonSpy;
                let complete: SinonSpy;
                beforeEach(() => {
                    next = spy();
                    error = spy();
                    complete = spy();
                });
                afterEach(() => {
                    sub.unsubscribe();
                });
                it('should trigger content of file to be read and decoder called', done => {
                    sub = stream.read().subscribe({next, error, complete});
                    setTimeout(() => {
                        expect(next).to.be.calledOnce;
                        expect(error).to.not.be.called;
                        expect(complete).to.not.be.called;
                        done();
                    });
                });
            });
        });
    });
});
