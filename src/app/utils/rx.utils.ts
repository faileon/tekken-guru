import {debounceTime, publish, take} from 'rxjs/operators';
import {concat, OperatorFunction, SchedulerLike} from 'rxjs';
import {async} from 'rxjs/internal/scheduler/async';

export function debounceTimeAfter(
  amount: number,
  dueTime: number,
  scheduler: SchedulerLike = async,
): OperatorFunction<number, number> {
  return publish(value =>
    concat(
      value.pipe(take(amount)),
      value.pipe(debounceTime(dueTime, scheduler))
    ),
  );
}

export function debounceTimeAfterFirst(
  dueTime: number,
  scheduler: SchedulerLike = async,
): OperatorFunction<number, number> {
  return debounceTimeAfter(1, dueTime, scheduler);
}
