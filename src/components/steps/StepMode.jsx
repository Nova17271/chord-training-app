import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

export default function StepMode({ answer, onNext }) {
  const [choice, setChoice] = useState(null);
  const [judged, setJudged] = useState(false);

  const freeMode = answer == null;

  const options = [
    { value: 'major', label: '大调 (Major)', desc: '听感明亮、欢快、稳定' },
    { value: 'minor', label: '小调 (Minor)', desc: '听感柔和、忧伤、暗淡' },
  ];

  const judge = (value) => {
    setChoice(value);
    setJudged(true);
  };

  const correct = !freeMode && judged && choice === answer.mode;

  return (
    <div>
      <h2 className="text-2xl font-semibold">步骤 1 / 4：确定大小调</h2>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        仔细听音乐的整体情绪，判断它是大调还是小调
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((opt) => {
          let cls = 'cursor-pointer rounded-xl border-2 p-5 text-left transition-colors ';
          if (!judged) {
            cls += 'border-border hover:border-primary';
          } else if (opt.value === choice) {
            cls += freeMode
              ? 'border-primary bg-primary/10'
              : correct
              ? 'border-green-500 bg-green-500/10'
              : 'border-red-500 bg-red-500/10';
          } else if (!freeMode && opt.value === answer.mode) {
            cls += 'border-green-500 bg-green-500/10';
          } else {
            cls += 'border-border opacity-60';
          }
          return (
            <button key={opt.value} className={cls} onClick={() => judge(opt.value)}>
              <div className="font-semibold">{opt.label}</div>
              <div className="mt-1 text-sm text-muted-foreground">{opt.desc}</div>
            </button>
          );
        })}
      </div>

      {judged && (
        <div
          className={
            'mt-5 rounded-lg px-4 py-3 text-sm font-medium ' +
            (freeMode || correct
              ? 'bg-green-500/10 text-green-600 dark:text-green-400'
              : 'bg-red-500/10 text-red-600 dark:text-red-400')
          }
        >
          {freeMode
            ? `你选择了「${choice === 'major' ? '大调' : '小调'}」，自由练习模式，继续下一步。`
            : correct
            ? '✅ 正确！判断为大调/小调很准确。'
            : `❌ 再听一听，正确答案是「${answer.mode === 'major' ? '大调' : '小调'}」。`}
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
