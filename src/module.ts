import { defineNuxtModule, addComponentsDir, createResolver } from '@nuxt/kit';
import { name, version } from '../package.json'

// Define module options interface
export interface ModuleOptions {
    prefix?: string;
    global?: boolean;
}

// Define the Nuxt module
export default defineNuxtModule<ModuleOptions>({
    meta: {
        name,
        version,
        configKey: 'ui',
        compatibility: {
            nuxt: '>=3.10.0',
        },
    },
    defaults: {
        prefix: '',
        global: false,
    },
    async setup(options, nuxt) {
        const { resolve } = createResolver(import.meta.url);

        // Transpile runtime
        const runtimeDir = resolve('./runtime');

        nuxt.options.alias['#nuxt-table'] = runtimeDir

        // Runtime components
        addComponentsDir({
            path: resolve(runtimeDir, 'components'),
            prefix: options.prefix,
            global: options.global,
        });


        nuxt.options.build.transpile.push(runtimeDir);
    },
});