import { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

export default function StepDetail({ answer, onFinish }) {
  const [notes, setNotes] = useState('');
  const [details, setDetails] = useState([]);

  const detailOptions = [
    '注意了低音线条 (bass line)',
    '识别了副属和弦 / 离调和弦',
    '发现了转调 (modulation)',
    '听出了节奏型与律动',
    '辨别了和弦转位 (inversion)',
    '留意了加音和弦 (add9 / sus 等)',
  ];

  const toggle = (d) => {
    setDetails((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">步骤 4 / 4：一些细节</h2>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        扒谱高手和普通人的差距往往在细节。回顾你刚才的听辨过程，标记你额外留意到的细节。
      </p>

      <div className="flex flex-wrap gap-2.5">
        {detailOptions.map((d) => (
          <button
            key={d}
            className={
              'rounded-full border-2 px-4 py-2 text-sm cursor-pointer transition-colors ' +
              (details.includes(d)
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border hover:border-primary')
            }
            onClick={() => toggle(d)}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <h4 className="mb-2 font-semibold">补充笔记（可选）</h4>
        <Textarea
          placeholder="记录你在扒谱中的心得体会、难点、下次要注意的地方..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
        />
      </div>

      <Button
        size="lg"
        className="mt-6"
        onClick={() => onFinish({ details, notes })}
      >
        完成练习，查看总结 →
      </Button>
    </div>
  );
}
