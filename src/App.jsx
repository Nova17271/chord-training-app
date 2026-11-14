import { useState } from 'react';
import SongSelector from './components/SongSelector';
import StepMode from './components/steps/StepMode';
import StepKey from './components/steps/StepKey';
import StepChord from './components/steps/StepChord';
import StepDetail from './components/steps/StepDetail';
import Summary from './components/Summary';
import { Progress } from './components/ui/progress';
import { Badge } from './components/ui/badge';

function App() {
  const [phase, setPhase] = useState('select'); // select | practice | summary
  const [song, setSong] = useState(null);
  const [step, setStep] = useState(1);
  const [results, setResults] = useState({
    step1: null,
    step2: null,
    step3: null,
    details: [],
    notes: '',
  });

  const handleConfirm = (selected) => {
    setSong(selected);
    setPhase('practice');
    setStep(1);
    setResults({ step1: null, step2: null, step3: null, details: [], notes: '' });
  };

  const restart = () => {
    setPhase('select');
    setSong(null);
    setStep(1);
    setResults({ step1: null, step2: null, step3: null, details: [], notes: '' });
  };

  const hasAnswer = song?.song?.answer != null;
  const progress = ((step - 1) / 4) * 100;

  return (
    <div className="mx-auto max-w-3xl px-5 py-6 pb-16">
      <header className="flex items-center justify-between border-b pb-5 mb-7">
        <div className="text-xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
          🎸 扒谱训练营
        </div>
        {phase === 'practice' && (
          <Badge variant="secondary" className="max-w-[320px] truncate">
            {song.name}
          </Badge>
        )}
      </header>

      {phase === 'select' && <SongSelector onConfirm={handleConfirm} />}

      {phase === 'practice' && (
        <>
          <Progress value={progress} className="mb-6" />

          {!hasAnswer && (
            <div className="mb-5 rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-600 dark:text-yellow-400">
              ⚠️ 当前为「上传音频」自由练习模式，无标准答案自动判分。请自行判断，完成四步即可。
            </div>
          )}

          {step === 1 && (
            <StepMode
              answer={hasAnswer ? song.song.answer : null}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <StepKey
              answer={hasAnswer ? song.song.answer : null}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <StepChord
              answer={hasAnswer ? song.song.answer : null}
              onNext={() => setStep(4)}
            />
          )}
          {step === 4 && (
            <StepDetail
              answer={hasAnswer ? song.song.answer : null}
              onFinish={(detail) => {
                setResults((prev) => ({ ...prev, ...detail }));
                setPhase('summary');
              }}
            />
          )}
        </>
      )}

      {phase === 'summary' && (
        <Summary song={song} results={results} onRestart={restart} />
      )}
    </div>
  );
}

export default App;
