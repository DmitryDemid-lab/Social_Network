import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './ProfileStatus.module.css';

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

export const ProfileStatusHooks = (props: ProfileStatusType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState(props.status)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    useEffect(() => {
        if (status !== props.status) {
            setStatus(props.status)
        }
    }, [props.status])

    return <div className={s.ProfileStatus}>
        {!editMode
            ? <div>
               <h4>My Status: </h4> <span onDoubleClick={activateEditMode}>{props.status || "-------"}</span>
            </div>
            : <div>
                <input
                    onBlur={deactivateEditMode}
                    value={status}
                    autoFocus
                    onChange={onStatusChange}
                />
            </div>
        }
    </div>
}