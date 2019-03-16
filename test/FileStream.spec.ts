import { expect, use as chaiUse } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { FSWatcher } from 'fs';
import { Subscription } from 'rxjs';
import { SinonSpy, spy, fake } from 'sinon';
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
            let fileName: string;
            let fileContent: string;
            let load: SinonSpy;
            let watch: SinonSpy;
            let write: SinonSpy;
            let next: SinonSpy;
            let error: SinonSpy;
            let complete: SinonSpy;
            beforeEach(async () => {
                fileName = 'some-test-file';
                fileContent = 'some content';
                load = fake.resolves(fileContent);
                watch = fake();
                write = fake.resolves(undefined);
                next = spy();
                error = spy();
                complete = spy();
                stream = new FileStream(
                    fileName,
                    load,
                    watch,
                    write);
            });
            describe('when subscriber is attached', () => {
                let sub: Subscription;
                beforeEach(() => {
                    sub = stream.read().subscribe({next, error, complete});
                });
                afterEach(() => {
                    sub.unsubscribe();
                });
                it('should trigger content of file to be read', done => {
                    setTimeout(() => {
                        expect(load).to.be.calledOnce;
                        expect(load).to.be.calledOnceWith(fileName);
                        done();
                    });
                });
                it('should trigger subscribed observable', done => {
                    setTimeout(() => {
                        expect(next).to.be.calledOnce;
                        expect(next).to.be.calledOnceWith(fileContent);
                        done();
                    });
                });
                it('should not trigger error/completed on subscribed observable', done => {
                    setTimeout(() => {
                        expect(error).to.not.be.called;
                        expect(complete).to.not.be.called;
                        done();
                    });
                });
            });
            describe('when subscriber is attached multiple times', () => {
                let sub1: Subscription;
                let sub2: Subscription;
                beforeEach(() => {
                    sub1 = stream.read().subscribe({next, error, complete});
                    sub2 = stream.read().subscribe({next, error, complete});
                });
                afterEach(() => {
                    sub1.unsubscribe();
                    sub2.unsubscribe();
                });
                it('should only read file once', done => {
                    setTimeout(() => {
                        expect(load).to.be.calledOnce;
                        expect(load).to.be.calledOnceWith(fileName);
                        done();
                    });
                });
                it('should trigger subscribed observable multiple times', done => {
                    setTimeout(() => {
                        expect(next).to.be.calledTwice;
                        expect(next).to.be.calledWith(fileContent);
                        done();
                    });
                });
                it('should not trigger error/completed on subscribed observable', done => {
                    setTimeout(() => {
                        expect(error).to.not.be.called;
                        expect(complete).to.not.be.called;
                        done();
                    });
                });
            });
        });
    });
});
