import { expect } from 'chai';
import { FeatureFlag } from '../src/domain/FeatureFlag';
import { createToggle } from './Fixture';
import { Context } from '../src/domain/Context';
import { Toggle } from '../src/domain/Toggle';

describe('FeatureFlag', () => {
    const defaultId = 'some_id';
    const defaultName = 'some_name';
    const defaultDescription = 'some_desc';
    const defaultToggles = [];

    describe('contructor', () => {

        it('should store provided arguments', () => {
            // Act
            const featureFlag = new FeatureFlag(
                defaultId,
                defaultName,
                defaultDescription,
                defaultToggles);

            // Assert
            expect(featureFlag.Id).to.equal(defaultId);
            expect(featureFlag.Name).to.equal(defaultName);
            expect(featureFlag.Description).to.equal(defaultDescription);
            expect(featureFlag.Toggles).to.eql(defaultToggles);
        });

        it('should create copy of toggles argument', () => {
            // Arrange
            const toggles = [
                createToggle()
            ];
            const expectedToggles = [...toggles];

            // Act
            const ff = new FeatureFlag(
                defaultId,
                defaultName,
                defaultDescription,
                toggles);
            toggles.push(createToggle());

            // Assert
            expect(ff.Toggles).to.eql(expectedToggles);
        });
    });

    describe('getToggles', () => {
        describe('with no toggles', () => {
            const featureFlag = new FeatureFlag(
                defaultId,
                defaultName,
                defaultDescription,
                []);
            [
                {text: 'empty context', value: new Context({})},
                {text: 'single-entry context', value: new Context({key: 'value'})},
                {text: 'multi-entry context', value: new Context({key1: 'value1', key2: 'value2'})}
            ].forEach(data => {
                it(`should return empty array on ${data.text}`, () => {
                    // Act
                    const res = featureFlag.getToggles(data.value);

                    expect(res).to.be.empty;
                });
            });
        });

        describe('with single toggle', () => {
            const contextData = {key: 'value'};
            const toggle = new Toggle(true, new Context(contextData));
            const featureFlag = new FeatureFlag(
                defaultId,
                defaultName,
                defaultDescription,
                [toggle]);
            [
                {text: 'empty context', value: new Context({})},
                {text: 'mismatched key context', value: new Context({key1: 'value'})},
                {text: 'mismatched value context', value: new Context({key: 'value1'})}
            ].forEach(data => {
                it(`should return empty array on input ${data.text}`, () => {
                    // Act
                    const res = featureFlag.getToggles(data.value);

                    // Assers
                    expect(res).to.be.empty;
                });
            });

            [
                {text: 'matching context', value: new Context({...contextData})},
                {text: 'matching context with extra', value: new Context({...contextData, k: 'l'})}
            ].forEach(data => {
                it(`should return toggle on input ${data.text}`, () => {
                    // Act
                    const res = featureFlag.getToggles(data.value);

                    // Assert
                    expect(res).to.be.not.empty;
                    expect(res).to.contain(toggle);
                });
            });
        });

        describe('with two toggles', () => {
            const contextData1 = {key1: 'value1'};
            const contextData2 = {key2: 'value2'};
            const contextDataCombined = {...contextData1, ...contextData2};
            const toggle1 = new Toggle(true, new Context(contextData1));
            const toggle2 = new Toggle(true, new Context(contextData2));
            const featureFlag = new FeatureFlag(
                defaultId,
                defaultName,
                defaultDescription,
                [toggle1, toggle2]);
            [
                {text: 'empty context', value: new Context({})},
                {text: 'mismatched key context', value: new Context({wrongKey: 'value1'})},
                {text: 'mismatched value context', value: new Context({key1: 'wrong value'})}
            ].forEach(data => {
                it(`should return empty array on input ${data.text}`, () => {
                    // Act
                    const res = featureFlag.getToggles(data.value);

                    // Assers
                    expect(res).to.be.empty;
                });
            });

            [
                {text: 'matching context', value: new Context({...contextData1})},
                {text: 'matching context with extra', value: new Context({...contextData1, k: 'l'})}
            ].forEach(data => {
                it(`should return first toggle on input ${data.text}`, () => {
                    // Act
                    const res = featureFlag.getToggles(data.value);

                    // Assert
                    expect(res.length).to.equal(1);
                    expect(res).to.contain(toggle1);
                });
            });

            [
                {text: 'matching context', value: new Context({...contextData2})},
                {text: 'matching context with extra', value: new Context({...contextData2, k: 'l'})}
            ].forEach(data => {
                it(`should return second toggle on input ${data.text}`, () => {
                    // Act
                    const res = featureFlag.getToggles(data.value);

                    // Assert
                    expect(res.length).to.equal(1);
                    expect(res).to.contain(toggle2);
                });
            });

            [
                {text: 'matching context', value: new Context({...contextDataCombined})},
                {text: 'matching context with extra', value: new Context({...contextDataCombined, k: 'l'})}
            ].forEach(data => {
                it(`should return both toggles on input ${data.text}`, () => {
                    // Act
                    const res = featureFlag.getToggles(data.value);

                    // Assert
                    expect(res.length).to.equal(2);
                    expect(res).to.contain(toggle1);
                    expect(res).to.contain(toggle2);
                });
            });
        });
    });
});
