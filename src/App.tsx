import { Button } from "./components/ui/button";
import { Github, FileVideo, Upload, Wand2 } from "lucide-react"
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { VideoInputForm } from "./components/video-input-form";
import { useState } from "react";
import { useCompletion } from 'ai/react'
import { PromptSelect } from "./components/prompt-select";

export function App() {
  const [videoId, setVideoId] = useState<string | null>(null)
  const [temperature, setTemperature] = useState(0.5)

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading
  } = useCompletion({
    api: "http://localhost:5001/ai/generate",
    body: {
      videoId,
      temperature
    },
    headers: {
      'Content-type': 'application/json'
    }
  })
  
  return (
  <div className="min-h-screen flex flex-col">
    <div className="px-6 py-3 flex items-center justify-between border-b">
      <h1 className="text-xl font-bold">upload.ai</h1>

      <div className="flex items-center gap-3">
        <span className="text-small text-muted-foreground">
          Desenvolvido com 🧡 no NLW da Rocketseat
        </span>

        <Separator orientation="vertical" className='h-6'/>

        <Button variant="secondary">
          <Github className="w-4 h-4 mr-2" />
          Github
        </Button>
      </div>
    </div>

    <main className="flex-1 p-6 flex gap-6">
      <div className="flex flex-col flex-1 gap-4">
        <div className="grid grid-rows-2 gap-4 flex-1">
          <Textarea className="resize-none p-5 leading-relaxed" placeholder="Inclua o prompt para a IA..." value={input} onChange={handleInputChange}/>
          <Textarea className="resize-none p-5 leading-relaxed" placeholder="Resultado gerado pela IA" readOnly value={completion}/>
        </div>
        
        <p>Lembre-se: Você pode utilizar a variável <code className="text-orange-400">{'{transcription}'}</code> no seu prompt para adicionar o conteúdo da transcrição do video selecionado</p>
      </div>

      <aside className="w-80 space-y-6">
        <VideoInputForm onVideoUploaded={setVideoId}/>

        <Separator />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label>Prompt</label>
            <PromptSelect onPromptSelected={setInput} />
          </div>

          <Separator />

          <div className="space-y-4">
            <label>Modelo</label>

            <Select disabled defaultValue="gpt3.5">
              <SelectTrigger>
                <SelectValue />
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </SelectTrigger>
              <span className="block text-xs text-muted-foreground italic">
                Você poderá customizar essa opção em breve
              </span>
            </Select>
          </div>

          <Separator />

          <div className="space-y-4">
            <label>Temperatura</label>
            <Slider 
              min={0}
              max={1}
              step={0.1}
              value={[temperature]}
              onValueChange={value => setTemperature(value[0])}
            />
            <span className="block text-xs text-muted-foreground italic leading-relaxed">
              Valores mais altos tendem a deixar o resultado mais criativo porém com possíveis erros
            </span>
          </div>

          <Separator />

          <Button disabled={isLoading} type="submit" className="w-full">
            Executar
            <Wand2 className="h-4 ml-2" />
          </Button>
        </form>
      </aside>
    </main>
  </div>
  )
}
