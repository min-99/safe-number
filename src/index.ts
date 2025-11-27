export type { NumberLike } from '@/types';
export * from '@/SafeMath';

// SafeMath.add() 형태로도 쓸 수 있도록 내보내기(javascript 컨셉)
import * as SafeMath from './SafeMath';
export { SafeMath };
