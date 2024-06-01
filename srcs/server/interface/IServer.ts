/**
 * @file IServer.ts
 * @description API interface, describing state of API action.
 * @version 0.0.1
 * @since 04/05/2024
 */

export declare enum ServerMessage {
    SERVER_START_SUCCESS = 'Server started successfully',
    SERVER_START_FAILED = 'Server started failed',
    SERVER_STOP_SUCCESS = 'Server stopped successfully',
    SERVER_STOP_FAILED = 'Server stopped failed',
    SERVER_RESTART_SUCCESS = 'Server restarted successfully',
    SERVER_RESTART_FAILED = 'Server restarted failed',
    SERVER_RELOAD_SUCCESS = 'Server reloaded successfully',
    SERVER_ERROR = 'Server error',
    SERVER_WARNING = 'Server warning',
}
