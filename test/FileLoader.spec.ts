import { FileLoader } from '../src/loaders/FileLoader';
import { expect, use as chaiUse } from 'chai';
import * as path from 'path';
import * as sinon from 'ts-sinon';
import { Mapper } from '../src/mappers';
import * as sinonChai from 'sinon-chai';
import { createApplicationEnvironment } from './Fixture';
import * as chaiAsPromised from 'chai-as-promised';
chaiUse(sinonChai);
chaiUse(chaiAsPromised);

describe('FileLoader', () => {
    describe('load', () => {
            const appEnv = createApplicationEnvironment();
            const stubbedMapper = sinon.stubInterface<Mapper<string>>({map: appEnv});
        describe('with no files or mappers specified', () => {
            const loader = new FileLoader();
            it('should return empty list', async () => {
                // Act
                const res = loader.load();

                // Assert
                expect(res).to.be.empty;
            });
        });
        describe('with single file and matching mapper specified', () => {
            const loader = new FileLoader()
                .addFile(path.resolve(__dirname, 'fileLoader.testdata.json'))
                .setMapper('json', stubbedMapper);
            it('should return predefined list and have called the mapper', async () => {
                // Act
                const res = await loader.load();

                // Assert
                expect(stubbedMapper.map).to.have.been.called;
                expect(res).to.be.deep.equal([appEnv]);
            });
        });
        describe('with single file and no matching mapper specified', () => {
            const appEnv = createApplicationEnvironment();
            const loader = new FileLoader()
                .addFile(path.resolve(__dirname, 'fileLoader.testdata.xml'))
                .setMapper('json', stubbedMapper);
            it('should throw error indicating missing mapper', () => {
                // Act
                return expect(loader.load()).to.be.rejectedWith(Error, /mapper.*xml/);
            });
        });
        describe('with single non-existing file and matching mapper specified', () => {
            const filename = 'fileLoader.none-existing-testdata.json';
            const loader = new FileLoader()
                .addFile(path.resolve(__dirname, filename))
                .setMapper('json', stubbedMapper);
            it('should throw error indicating missing file', () => {
                // Act
                return expect(loader.load()).to.be.rejectedWith(
                    Error,
                    new RegExp(`file.*${filename}`));
            });
        });
    });
});
