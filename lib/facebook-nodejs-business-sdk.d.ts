// Type declaration for facebook-nodejs-business-sdk
declare module 'facebook-nodejs-business-sdk' {
    export class FacebookAdsApi {
        static init(accessToken: string): FacebookAdsApi;
    }

    export class Content {
        setId(id: string): Content;
        setQuantity(quantity: number): Content;
        setItemPrice(price: number): Content;
    }

    export class CustomData {
        setValue(value: number): CustomData;
        setCurrency(currency: string): CustomData;
        setContentName(contentName: string): CustomData;
        setContents(contents: Content[]): CustomData;
        setContentType(contentType: string): CustomData;
    }

    export class UserData {
        setEmails(emails: string[]): UserData;
        setPhones(phones: string[]): UserData;
        setFirstNames(firstNames: string[]): UserData;
        setLastNames(lastNames: string[]): UserData;
        setClientIpAddress(ipAddress: string): UserData;
        setClientUserAgent(userAgent: string): UserData;
        setFbp(fbp: string): UserData;
        setFbc(fbc: string): UserData;
        setExternalId(externalId: string): UserData;
    }

    export class ServerEvent {
        setEventName(eventName: string): ServerEvent;
        setEventTime(eventTime: number): ServerEvent;
        setEventId(eventId: string): ServerEvent;
        setEventSourceUrl(eventSourceUrl: string): ServerEvent;
        setActionSource(actionSource: string): ServerEvent;
        setUserData(userData: UserData): ServerEvent;
        setCustomData(customData: CustomData): ServerEvent;
    }

    export class EventRequest {
        constructor(accessToken: string, pixelId: string);
        setEvents(events: ServerEvent[]): EventRequest;
        execute(): Promise<unknown>;
    }

    const bizSdk: {
        FacebookAdsApi: typeof FacebookAdsApi;
        Content: typeof Content;
        CustomData: typeof CustomData;
        UserData: typeof UserData;
        ServerEvent: typeof ServerEvent;
        EventRequest: typeof EventRequest;
    };

    export default bizSdk;
}
