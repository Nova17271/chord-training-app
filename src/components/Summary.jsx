import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

export default function Summary({ song, results, onRestart }) {
  const total = 3;
  const correctCount = [results.step1, results.step2, results.step3].filter(Boolean).length;

  const items = [
    { label: '步骤 1 · 大小调', pass: results.step1 },
    { label: '步骤 2 · 具体调', pass: results.step2 },
    { label: '步骤 3 · 匹配和弦', pass: results.step3 },
  ];

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold">🎉 练习完成</h2>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">{song.name}</p>

      <div className="mx-auto my-6 flex h-44 w-44 flex-col items-center justify-center rounded-full border-2 border-primary bg-card">
        <div className="text-4xl font-bold">{correctCount} / {total}</div>
        <div className="mt-1 text-sm text-muted-foreground">正确步骤</div>
      </div>

      <Card className="mx-auto max-w-md text-left">
        <CardContent className="pt-5">
          <div className="space-y-2.5">
            {items.map((item) => (
              <div
                key={item.label}
                className={
                  'flex items-center justify-between rounded-lg border px-4 py-3 ' +
                  (item.pass ? 'border-green-500/50' : 'border-red-500/50')
                }
              >
                <span className="font-medium">{item.label}</span>
                <span className="text-lg">{item.pass ? '✅' : '❌'}</span>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-lg border px-4 py-3">
              <span className="font-medium">步骤 4 · 细节</span>
              <span className="text-sm text-muted-foreground">
                {results.details.length > 0 ? `${results.details.length} 项` : '—'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {results.notes && (
        <Card className="mx-auto mt-5 max-w-md text-left">
          <CardContent className="pt-5">
            <h4 className="mb-2 text-sm text-muted-foreground">你的笔记</h4>
            <p className="whitespace-pre-wrap text-sm">{results.notes}</p>
          </CardContent>
        </Card>
      )}

      <Button size="lg" className="mt-6" onClick={onRestart}>
        再练一首 →
      </Button>
    </div>
  );
}
