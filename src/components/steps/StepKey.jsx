import { useState } from 'react';
import { majorScales, minorScales } from '../../data/chordLibrary';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

export default function StepKey({ answer, onNext }) {
  const [choice, setChoice] = useState(null);
  const [judged, setJudged] = useState(false);

  const freeMode = answer == null;
  const scaleMap = freeMode || answer.mode === 'major' ? majorScales : minorScales;
  const keyOptions = Object.keys(scaleMap);

  const judge = (value) => {
    setChoice(value);
    setJudged(true);
  };

  const correct = !freeMode && judged && choice === answer.key;
  const displayKey = freeMode ? choice : answer.key;
  const displayScale = majorScales[displayKey] || minorScales[displayKey];

  return (
    <div>
      <h2 className="text-2xl font-semibold">步骤 2 / 4：确定是哪个调</h2>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        通过听主音（do）所在的位置，确定具体的调。选择后下方会显示该调的构成音与和弦组。
      </p>

      {freeMode && (
        <div className="mb-4 rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-600 dark:text-yellow-400">
          自由练习模式：可任选大调或小调中的任意调查看其构成音与和弦组。
        </div>
      )}

      <div className="flex flex-wrap gap-2.5">
        {keyOptions.map((key) => {
          let cls = 'min-w-[90px] flex-1 rounded-lg border-2 px-3 py-3 text-center text-sm font-semibold cursor-pointer transition-colors ';
          if (!judged) {
            cls += 'border-border hover:border-primary';
          } else if (key === choice) {
            cls += freeMode
              ? 'border-primary bg-primary/10'
              : correct
              ? 'border-green-500 bg-green-500/10'
              : 'border-red-500 bg-red-500/10';
          } else if (!freeMode && key === answer.key) {
            cls += 'border-green-500 bg-green-500/10';
          } else {
            cls += 'border-border opacity-50';
          }
          return (
            <button key={key} className={cls} onClick={() => judge(key)}>
              {key}
            </button>
          );
        })}
      </div>

      {judged && displayScale && (
        <div>
          <div
            className={
              'mt-5 rounded-lg px-4 py-3 text-sm font-medium ' +
              (freeMode || correct
                ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                : 'bg-red-500/10 text-red-600 dark:text-red-400')
            }
          >
            {freeMode
              ? `你选择了「${choice}」，下面是它的构成音与和弦组。`
              : correct
              ? '✅ 正确！主音判断准确。'
              : `❌ 正确答案是「${answer.key}」。看看下面这个调的构成音，对比你听到的主音。`}
          </div>

          <Card className="mt-5">
            <CardContent className="pt-5">
              <h4 className="mb-3 font-semibold">「{displayKey}」的构成音（音阶）</h4>
              <div className="flex flex-wrap gap-2">
                {displayScale.notes.map((n) => (
                  <span
                    key={n}
                    className="rounded-md border bg-muted px-3 py-1.5 font-mono font-semibold"
                  >
                    {n}
                  </span>
                ))}
              </div>

              <h4 className="mt-5 mb-3 font-semibold">顺阶和弦组</h4>
              <div className="flex flex-wrap gap-2">
                {displayScale.notes.map((n, i) => {
                  const root = n;
                  const third = displayScale.notes[(i + 2) % 7];
                  const fifth = displayScale.notes[(i + 4) % 7];
                  const chord = `${root}${third}${fifth}`;
                  return (
                    <span
                      key={i}
                      className="rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 font-mono font-semibold text-primary"
                    >
                      {chord}
                      <small className="ml-1.5 text-xs font-normal text-muted-foreground">
                        ({['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'][i]})
                      </small>
                    </span>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {judged && (
        <Button size="lg" className="mt-6" onClick={onNext}>
          下一步 →
        </Button>
      )}
    </div>
  );
}
