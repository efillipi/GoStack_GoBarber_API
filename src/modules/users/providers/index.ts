import { container } from 'tsyringe';

import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import JWTAuthProvider from '@modules/users/providers/AuthProvider/implementations/JWTAuthProvider';
import IAuthProvider from '@modules/users/providers/AuthProvider/models/IAuthProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IAuthProvider>('AuthProvider', JWTAuthProvider);
