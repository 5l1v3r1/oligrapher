import React, { useCallback, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { IoIosMore } from 'react-icons/io'
import { IconButton, Menu, MenuItem } from '@material-ui/core'

import ConfirmDelete from './ConfirmDelete'
import ShareModal from './ShareModal'
import { useSelector } from '../util/helpers'
import { userIsOwnerSelector } from '../util/selectors'

export default function ActionMenu() {
  const dispatch = useDispatch()
  const { id, shareUrl } = useSelector(state => state.attributes)
  const userIsOwner = useSelector(userIsOwnerSelector)
  const { clone: isCloneable, private: isPrivate } = useSelector(state => state.attributes.settings)

  const toggleRef = useRef() as React.RefObject<HTMLButtonElement>

  const [open, setOpen] = useState(false)
  const openMenu = useCallback(() => setOpen(true), [])
  const closeMenu = useCallback(() => setOpen(false), [])

  const [showConfirm, setShowConfirm] = useState(false)
  const openConfirm = useCallback(() => {
    setShowConfirm(true)
    closeMenu()
  }, [closeMenu])

  const [showShare, setShowShare] = useState(false)
  const openShare = useCallback(() => {
    setShowShare(true)
    closeMenu()
  }, [closeMenu])
  const closeShare = useCallback(() => setShowShare(false), [])

  const presentMap = useCallback(
    () => dispatch({ type: 'SET_EDITOR_MODE', enabled: false }),
    [dispatch]
  )

  const cloneMap = useCallback(() => {
    dispatch({ type: 'CLONE_REQUESTED' })
    closeMenu()
  }, [dispatch, closeMenu])
 
  const cancelDelete = useCallback(() => setShowConfirm(false), [])
 
  const confirmDelete = useCallback(() => {
    dispatch({ type: 'DELETE_REQUESTED' })
    setShowConfirm(false)
  }, [dispatch])

  const canShare = userIsOwner && isPrivate && shareUrl
  const canClone = userIsOwner || isCloneable
  const canDelete = userIsOwner && id

  return (
    <div className="header-action-menu-wrapper">
      <IconButton id="toggle-action-menu" ref={toggleRef} aria-controls="simple-menu" aria-haspopup="true" size="small" onClick={openMenu}>
        <IoIosMore />
      </IconButton>

      <Menu
        id="header-action-menu"
        anchorEl={toggleRef.current}
        open={open}
        onClose={closeMenu}
        transitionDuration={0}
      >
        <MenuItem dense={true} onClick={presentMap}>Present</MenuItem>
        {/* ActionMenu is visible to editors but only owners can share or clone or delete */}
        { canShare && <MenuItem dense={true} onClick={openShare}>Share</MenuItem> }
        { canClone && <MenuItem dense={true} onClick={cloneMap}>Clone</MenuItem> }
        { canDelete && <MenuItem dense={true} onClick={openConfirm}>Delete</MenuItem> }
      </Menu>

      <ConfirmDelete open={showConfirm} cancel={cancelDelete} confirm={confirmDelete} />
      <ShareModal open={showShare} close={closeShare} url={shareUrl} />
    </div>
  )
}