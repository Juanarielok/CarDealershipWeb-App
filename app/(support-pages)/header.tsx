import Link from 'next/link'

export default function SupportHeader() {
  return (
    <header className="fixed w-full bg-white border-b border-slate-200 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
  
          <div className="shrink-0 mr-4">
          
    
          </div>

         
          <nav className="flex grow">
         
            <ul className="flex grow justify-end flex-wrap items-center">
              <li className="ml-3">
                <a className="btn-sm inline-flex items-center text-slate-100 bg-slate-800 hover:bg-slate-900 shadow-sm" href="#0">
                  Get in touch
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>        
  )
}