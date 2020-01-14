export interface User {
    '.expires': string;
    '.issued': string;
    'access_token': string;
    'as:client_id': string;
    'displayName': string;
    'email': string;
    'expires_in': number;
    'permissions': string;
    'redirectUrl': string;
    'refresh_token': string;
    'resetPassword': string;
    'token_type': string;
    'userMetadata': string;
    'userName': string;
    'source': {
        'value': {
            'access_token': string;
        }
    }
}