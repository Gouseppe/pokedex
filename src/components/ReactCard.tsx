import { capitalize } from '../helpers/strings';
import { setPokemonName } from '../shared';
import type { PokemonTypes } from '../types';

interface Props {
  id: number;
  title: string;
  body?: string;
  image: string;
  types: PokemonTypes[];
  infoButton?: boolean;
}
const colors: Record<PokemonTypes, string> = {
  bug: 'bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300',
  dark: 'bg-black-100 text-black-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-black-900 dark:text-black-300',
  dragon:
    'bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300',
  electric:
    'bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300',
  fairy:
    'bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300',
  fighting:
    'bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300',
  fire: 'bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300',
  flying:
    'bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300',
  ghost:
    'bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300',
  grass:
    'bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300',
  ground:
    'bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300',
  ice: 'bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300',
  normal:
    'bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-900 dark:text-gray-300',
  poison:
    'bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300',
  psychic:
    'bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300',
  rock: 'bg-amber-100 text-amber-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-amber-900 dark:text-amber-300',
  steel:
    'bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-900 dark:text-gray-300',
  water:
    'bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300',
};

export const ReactCard: React.FC<Props> = ({
  image,
  title,
  types,
  body,
  id,
  infoButton = true,
}) => {
  return (
    <section className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <a href={`${title}`}>
        <img className='rounded-t-lg' src={image} alt={title} />
      </a>
      <div className='p-5'>
        <div className='flex justify-start gap-2'>
          <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            {capitalize(title)}
          </h5>
          <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            #{`${id}`.padStart(3, '0')}
          </h5>
        </div>
        <div className='flex justify-between'>
          <div className='mb-2'>
            {types.map((type) => {
              return (
                <span key={type} className={colors[type]}>
                  {type}
                </span>
              );
            })}
          </div>

          {infoButton && (
            <a
              href={`${title}`}
              className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              onClick={() => setPokemonName(title)}
            >
              Saber mas
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
