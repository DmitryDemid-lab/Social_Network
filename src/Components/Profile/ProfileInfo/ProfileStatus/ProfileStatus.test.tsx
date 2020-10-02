import React from "react";
import {create} from 'react-test-renderer';
import ProfileStatus from "./ProfileStatus";

describe("Profile status component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status={'Hello, it is test'} updateStatus={() => {
        }}/>);
        const instance = component.getInstance();
        // @ts-ignore
        expect(instance.state.status).toBe("Hello, it is test");
    });
    test("after creation span should be displayed", () => {
        const component = create(<ProfileStatus status={'Hello, it is test'} updateStatus={() => {
        }}/>);
        const root = component.root;
        const span = root?.findByType('span')
        expect(span).not.toBeNull();
    })
    test("after creation input should not be displayed", () => {
        const component = create(<ProfileStatus status={'Hello, it is test'} updateStatus={() => {
        }}/>);
        const root = component.root;
        expect(() => {
            const input = root?.findByType('input')
        }).toThrowError();
    })
    test("after creation span should contains correct status", () => {
        const component = create(<ProfileStatus status={'Hello, it is test'} updateStatus={() => {
        }}/>);
        const root = component.root;
        const span = root?.findByType('span')
        expect(span?.children[0]).toBe('Hello, it is test');
    });
    test("input should be displayed in edit mode instead of span", () => {
        const component = create(<ProfileStatus status={'Hello, it is test'} updateStatus={() => {
        }}/>);
        const root = component.root;
        const span = root?.findByType('span')
        span?.props.onDoubleClick()
        const input = root?.findByType('input')
        expect(input?.props.value).toBe('Hello, it is test');
    });
    test("callback should be called", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status={'Hello, it is test'} updateStatus={mockCallback}/>);
        const instance = component.getInstance()
        // @ts-ignore
        instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});