import { useState } from 'react';
import { chordProgressions, progressionToChords } from '../../data/chordLibrary';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

export default function StepChord({ answer, onNext }) {
  const [chosenChords, setChosenChords] = useState([]);
  const [judged, setJudged] = useState(false);

  const freeMode = answer == null;

  const chordOptions = freeMode
    ? ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim', 'C7', 'G7', 'D', 'E', 'A', 'Fm']
    : answer.diatonicChords;

  const toggleChord = (chord) => {
    setChosenChords((prev) =>
      prev.includes(chord) ? prev.filter((c) => c !== chord) : [...prev, chord]
    );
  };

  const judge = () => setJudged(true);

  let correct = false;
  let target = [];
  let targetSet = [];
  if (!freeMode) {
    target = answer.progressionChords;
    targetSet = [...new Set(target)].sort();
    const chosenSet = [...chosenChords].sort();
    correct =
      targetSet.length === chosenSet.length &&
      targetSet.every((v, i) => v === chosenSet[i]);
  }

  const matchedProgressions = freeMode
    ? chordProgressions
    : chordProgressions.filter((p) => {
        const pChords = progressionToChords(p.progression, answer.key);
        return pChords.some((c) => targetSet.includes(c));
      });

  const displayKey = freeMode ? 'C 大调' : answer.key;

  return (
    <div>
      <h2 className="text-2xl font-semibold">步骤 3 / 4：匹配和弦</h2>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        根据旋律走向、已使用的和弦，从套路库中找到最可能的和弦进行。
        勾选出你听到/推断出的和弦（不限顺序）。
      </p>

      {answer?.melodyHint && (
        <div className="mb-5 rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-600 dark:text-yellow-400">
          <strong>旋律提示：</strong>
          {answer.melodyHint}
        </div>
      )}

      <div className="flex flex-wrap gap-2.5">
        {chordOptions.map((chord) => (
          <button
            key={chord}
            className={
              'rounded-lg border-2 px-4 py-2.5 font-mono font-semibold cursor-pointer transition-colors ' +
              (chosenChords.includes(chord)
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border hover:border-primary')
            }
            onClick={() => toggleChord(chord)}
          >
            {chord}
          </button>
        ))}
      </div>

      {!judged && (
        <Button size="lg" className="mt-6" disabled={chosenChords.length === 0} onClick={judge}>
          提交答案
        </Button>
      )}

      {judged && (
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
              ? '自由练习模式：以下为你的选择与常用套路库参考。'
              : correct
              ? '✅ 完全正确！你精准匹配出了这首歌的和弦。'
              : '❌ 还不完全对，看看下面的对比和套路推荐。'}
          </div>

          <Card className="mt-5">
            <CardContent className="pt-5">
              {!freeMode && (
                <>
                  <h4 className="mb-3 font-semibold">标准答案和弦</h4>
                  <div className="flex flex-wrap gap-2">
                    {target.map((c, i) => (
                      <span
                        key={i}
                        className="rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 font-mono font-semibold text-primary"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </>
              )}

              <h4 className="mt-5 mb-3 font-semibold">你的答案</h4>
              <div className="flex flex-wrap gap-2">
                {chosenChords.length ? (
                  chosenChords.map((c, i) => (
                    <span
                      key={i}
                      className={
                        'rounded-md border px-3 py-1.5 font-mono font-semibold ' +
                        (!freeMode && targetSet.includes(c)
                          ? 'border-primary/30 bg-primary/10 text-primary'
                          : 'border-red-500/40 bg-red-500/10 text-red-500')
                      }
                    >
                      {c}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">（未选择）</span>
                )}
              </div>

              <h4 className="mt-5 mb-3 font-semibold">套路库推荐（{displayKey}）</h4>
              <div className="space-y-3">
                {matchedProgressions.map((p) => {
                  const pChords = progressionToChords(p.progression, displayKey);
                  return (
                    <div key={p.id} className="rounded-lg border p-4">
                      <div className="font-semibold">
                        {p.name}
                        <span className="ml-2 text-xs font-normal text-muted-foreground">
                          {p.style}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {pChords.map((c, i) => (
                          <span
                            key={i}
                            className="rounded bg-muted px-2 py-1 font-mono text-xs font-semibold"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        {p.description}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Button size="lg" className="mt-6" onClick={onNext}>
            下一步 →
          </Button>
        </div>
      )}
    </div>
  );
}
