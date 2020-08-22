import React from 'react';
import s from './ProfileStatus.module.css';

type ProfileStatusType = {
    status: string
}

class ProfileStatus extends React.Component<ProfileStatusType> {
    state = {
        editMode: false
    }

    activateEditMode = () => {
        console.log(this)
        this.setState({editMode: true})
    }
    deactivateEditMode = () => {
        this.setState({editMode: false})
    }

    render() {
        return <div>
            {!this.state.editMode
                ? <div className={s.ProfileStatus}>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                </div>
                : <div className={s.ProfileStatus}>
                    <input
                        onBlur={this.deactivateEditMode}
                        value={this.props.status}
                        autoFocus
                    />
                </div>
            }
        </div>
    }
}

export default ProfileStatus;