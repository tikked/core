import { FileLoader } from '../src/persistency/FileLoader';
import { expect, use as chaiUse } from 'chai';
import * as path from 'path';
import * as sinon from 'ts-sinon';
import { Decoder } from '../src/persistency';
import * as sinonChai from 'sinon-chai';
import { createApplicationEnvironment } from './Fixture';
import * as chaiAsPromised from 'chai-as-promised';
chaiUse(sinonChai);
chaiUse(chaiAsPromised);

describe('FileLoader', () => {
    describe('load', () => {
            const appEnv = createApplicationEnvironment();
            const stubbedDecoder = sinon.stubInterface<Decoder<string>>({decode: appEnv});
        describe('with no files or decoders specified', () => {
            const loader = new FileLoader();
            it('should return empty list', async () => {
                // Act
                const res = loader.load();

                // Assert
                expect(res).to.be.empty;
            });
        });
        describe('with single file and matching decoder specified', () => {
            const loader = new FileLoader()
                .addFile(path.resolve(__dirname, 'fileLoader.testdata.json'))
                .setDecoder('json', stubbedDecoder);
            it('should return predefined list and have called the decoder', async () => {
                // Act
                const res = await loader.load();

                // Assert
                expect(stubbedDecoder.decode).to.have.been.called;
                expect(res).to.be.deep.equal([appEnv]);
            });
        });
        describe('with single file and no matching decoder specified', () => {
            const appEnv = createApplicationEnvironment();
            const loader = new FileLoader()
                .addFile(path.resolve(__dirname, 'fileLoader.testdata.xml'))
                .setDecoder('json', stubbedDecoder);
            it('should throw error indicating missing decoder', () => {
                // Act
                return expect(loader.load()).to.be.rejectedWith(Error, /decoder.*xml/);
            });
        });
        describe('with single non-existing file and matching decoder specified', () => {
            const filename = 'fileLoader.none-existing-testdata.json';
            const loader = new FileLoader()
                .addFile(path.resolve(__dirname, filename))
                .setDecoder('json', stubbedDecoder);
            it('should throw error indicating missing file', () => {
                // Act
                return expect(loader.load()).to.be.rejectedWith(
                    Error,
                    new RegExp(`file.*${filename}`));
            });
        });
    });
});
