import { useEffect, useRef, useState, Fragment } from 'react'
import { wapService } from '../../../services/wap.service.local'
import { useSelector } from 'react-redux'

import { Tooltip } from '@mui/material'
import { KeyboardArrowRight } from '@mui/icons-material'
import { Draggable, Droppable } from 'react-beautiful-dnd'

export function LeftSidebar({
  onThemeSelect,
  draggedItemWidth,
  toggleLeftTools,
  isLeftToolsOpen,
  prevModuleOpened,
  isModuleToolsOpen,
  setIsLeftToolsOpen,
  setPrevModuleOpened,
  setIsModuleToolsOpen,
}) {
  const sidebarRef = useRef(null)
  const cmpModules = wapService.getCmpModules()
  const themeModules = wapService.getThemeModules()
  const [currItemsToShow, setCurrItemsToShow] = useState([])
  const [isThemeSelected, setIsThemeSelected] = useState(false)
  const [originalWapTheme, setOriginalWapTheme] = useState(null)
  const wap = useSelector(storeState => storeState.wapModule.present.wap)

  useEffect(() => {
    getOriginalWapTheme()
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [toggleLeftTools])

  function handleClickOutside(event) {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest('.top-tools')) {
      setIsLeftToolsOpen(false)
      setIsModuleToolsOpen(false)
      setPrevModuleOpened(null)
    }
  }

  function getOriginalWapTheme() {
    const originalTheme = wapService.getWapTheme(wap)
    setOriginalWapTheme(originalTheme)
  }

  function handleModuleToggle(moduleType) {
    if (prevModuleOpened === moduleType) {
      setIsModuleToolsOpen(!isModuleToolsOpen)
      setPrevModuleOpened(null)
      return
    }

    setIsModuleToolsOpen(true)
    setPrevModuleOpened(moduleType)

    if (moduleType === 'Themes') {
      setIsThemeSelected(true)
      setCurrItemsToShow(themeModules)
    } else {
      setIsThemeSelected(false)
      const selectedCmpModule = cmpModules.find(module => module.category === moduleType)
      setCurrItemsToShow(selectedCmpModule.cmps || [])
    }
  }

  return (
    <Droppable droppableId='left-tools'>
      {provided => (
        <div className='left-sidebar' ref={sidebarRef}>
          <aside
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`left-tools ${isLeftToolsOpen ? 'open' : ''}`}
          >
            <ul className='tool-items'>
              {cmpModules.map((module, idx) => (
                <li
                  key={`module-item-${module._id}-${idx}`}
                  onClick={() => handleModuleToggle(module.category)}
                  className={module.category === prevModuleOpened ? 'active' : ''}
                >
                  {module.name}
                </li>
              ))}
              <li className='theme-item' onClick={() => handleModuleToggle('Themes')}>
                Themes
              </li>
            </ul>
          </aside>

          <aside
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`module-tools ${isModuleToolsOpen ? 'open' : ''}`}
          >
            <ul className='module-items'>
              <h1>{prevModuleOpened}</h1>
              {prevModuleOpened !== 'Themes' &&
                currItemsToShow?.map(({ _id, type, imgUrl }, index) => (
                  <Draggable key={`sidebar-${_id}`} draggableId={`sidebar-${_id}`} index={index}>
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`module-item ${snapshot.isDragging ? 'dragging' : ''}`}
                      >
                        {isThemeSelected ? (
                          <span className='module-name'>{type}</span>
                        ) : (
                          <Fragment>
                            {snapshot.isDragging ? (
                              <img
                                alt={type}
                                src={imgUrl}
                                className='module-img'
                                style={{ width: `${draggedItemWidth}px` }}
                              />
                            ) : (
                              <img src={imgUrl} alt={type} className='module-img' />
                            )}
                          </Fragment>
                        )}
                      </li>
                    )}
                  </Draggable>
                ))}
              {prevModuleOpened === 'Themes' && (
                <li
                  onClick={() => onThemeSelect(originalWapTheme)}
                  className={`theme-module-item module-item theme-item ${originalWapTheme}`}
                >
                  <span className='module-name'>Original</span>
                </li>
              )}
              {prevModuleOpened === 'Themes' &&
                currItemsToShow?.map(({ _id, type, className }) => (
                  <li
                    key={_id}
                    onClick={() => onThemeSelect(className.toLowerCase())}
                    className={`theme-module-item module-item theme-item ${className}`}
                  >
                    <span className='module-name'>{type}</span>
                  </li>
                ))}
            </ul>
            {provided.placeholder}
          </aside>

          {!isLeftToolsOpen && (
            <div className='btn-open-tools-container'>
              <div className='open-tools-box' onClick={toggleLeftTools}>
                <Tooltip title='Open Menu' placement='right'>
                  <KeyboardArrowRight className='btn btn-open-tools' />
                </Tooltip>
              </div>
            </div>
          )}
        </div>
      )}
    </Droppable>
  )
}
