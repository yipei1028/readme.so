import { useState, useEffect } from 'react'
import { Nav } from '../components/Nav'
import { SectionsColumn } from '../components/SectionsColumn'
import { EditorColumn } from '../components/EditorColumn'
import { PreviewColumn } from '../components/PreviewColumn'
import { sectionTemplates } from '../data/section-templates'
import { DownloadModal } from '../components/DownloadModal'
import Head from 'next/head'

export default function Editor() {
  const [selectedSections, setSelectedSections] = useState([])
  const [sections, setSections] = useState(sectionTemplates.map((t) => t.slug))
  const [focusedSectionSlug, setFocusedSectionSlug] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [templates, setTemplates] = useState(sectionTemplates)
  const [isMobile, setIsMobile] = useState(false)

  const getTemplate = (slug) => {
    return templates.find((t) => t.slug === slug)
  }

  useEffect(() => {
    const section = 'title-and-description'
    setSections((prev) => prev.filter((s) => s !== section))
    setSelectedSections((prev) => [...prev, section])
    setFocusedSectionSlug(section)
  }, [])

  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent))
  }, [])

  return (
    <>
      {isMobile ? (
        <div className="p-3">
          <div className="bg-white shadow rounded-lg mt-2.5">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                This site is optimized for desktop
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Please visit readme.so on a desktop to create your readme!</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Mali&display=swap"
              rel="stylesheet"
            />
            <script
              data-name="BMC-Widget"
              data-cfasync="false"
              src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
              data-id="katherinecodes"
              data-description="Support me on Buy me a coffee!"
              data-message=""
              data-color="#FFDD00"
              data-position="Right"
              data-x_margin="18"
              data-y_margin="18"
            ></script>
          </Head>
          <Nav
            selectedSections={selectedSections}
            setShowModal={setShowModal}
            getTemplate={getTemplate}
          />
          {showModal && <DownloadModal setShowModal={setShowModal} />}
          <div className="flex p-6">
            <SectionsColumn
              selectedSections={selectedSections}
              setSelectedSections={setSelectedSections}
              sections={sections}
              setSections={setSections}
              setFocusedSectionSlug={setFocusedSectionSlug}
              focusedSectionSlug={focusedSectionSlug}
              getTemplate={getTemplate}
            />
            <div className="flex flex-col flex-1 lg:flex-row">
              <EditorColumn
                focusedSectionSlug={focusedSectionSlug}
                selectedSections={selectedSections}
                setSelectedSections={setSelectedSections}
                templates={templates}
                setTemplates={setTemplates}
              />
              <PreviewColumn selectedSections={selectedSections} getTemplate={getTemplate} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
