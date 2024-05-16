import { Server } from 'http';

export default interface IBootstrapper {
    /**
     * Bootstraps the application.
     */
    bootstrap(): Promise<Server>;
}
