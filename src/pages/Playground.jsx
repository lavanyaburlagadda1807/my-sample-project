import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import SplitPane from 'react-split-pane'
import { motion } from 'framer-motion'

const Playground = () => {
  const { signOut, user } = useAuth()
  const navigate = useNavigate()
  const [html, setHtml] = useState('<div class="hello">Hello World</div>')
  const [css, setCss] = useState('.hello { color: blue; }')
  const [js, setJs] = useState('console.log("Hello from JavaScript!")')
  const [output, setOutput] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      const combinedOutput = `
        <html>
          <style>${css}</style>
          <body>${html}</body>
          <script>${js}</script>
        </html>
      `
      setOutput(combinedOutput)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <nav className="bg-gray-800 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Code Playground</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">{user?.email}</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignOut}
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              Sign Out
            </motion.button>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex">
        <SplitPane split="vertical" minSize={50} defaultSize="50%">
          <div className="h-full flex flex-col">
            <SplitPane split="horizontal" minSize={50} defaultSize="33%">
              <div className="w-full h-full">
                <div className="bg-gray-700 text-white px-4 py-2">HTML</div>
                <Editor
                  height="calc(100% - 36px)"
                  defaultLanguage="html"
                  theme="vs-dark"
                  value={html}
                  onChange={setHtml}
                  options={{ minimap: { enabled: false } }}
                />
              </div>
              <SplitPane split="horizontal" minSize={50} defaultSize="50%">
                <div className="w-full h-full">
                  <div className="bg-gray-700 text-white px-4 py-2">CSS</div>
                  <Editor
                    height="calc(100% - 36px)"
                    defaultLanguage="css"
                    theme="vs-dark"
                    value={css}
                    onChange={setCss}
                    options={{ minimap: { enabled: false } }}
                  />
                </div>
                <div className="w-full h-full">
                  <div className="bg-gray-700 text-white px-4 py-2">JavaScript</div>
                  <Editor
                    height="calc(100% - 36px)"
                    defaultLanguage="javascript"
                    theme="vs-dark"
                    value={js}
                    onChange={setJs}
                    options={{ minimap: { enabled: false } }}
                  />
                </div>
              </SplitPane>
            </SplitPane>
          </div>
          <div className="w-full h-full bg-white">
            <div className="bg-gray-700 text-white px-4 py-2">Output</div>
            <iframe
              title="output"
              srcDoc={output}
              style={{ width: '100%', height: 'calc(100% - 36px)' }}
              sandbox="allow-scripts"
            />
          </div>
        </SplitPane>
      </div>
    </div>
  )
}

export default Playground
