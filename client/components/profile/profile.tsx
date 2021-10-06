import { useMutation, useQuery } from '@apollo/client'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { UPDATE_PASSWORD, UPDATE_PROFILE } from '../../gql/mutations'
import { PROFILE } from '../../gql/queries'
import { ProfileData, UpdateProfileVars, UpdateProfileData, UpdatePasswordData, UpdatePasswordVars } from '../../gql/types'
import { ProfileInterface } from '../../interface/profile'
import EllipsisLoading from '../loading/ellipsis'
import ProfileInfo from './info.profile'
import styles from './profile.module.scss'
import { newNotification } from '../../redux/slices/notificationSlice'
import { NotificationStatusEnum } from '../notification/notification'

export interface ProfileProps { }

const Profile: React.SFC<ProfileProps> = () => {
    const [profile, setProfile] = useState<ProfileInterface>()
    const { data, error, loading } = useQuery<ProfileData, {}>(PROFILE)
    const dispatch = useDispatch()
    const [updateProfile, updateProfileResult] = useMutation<UpdateProfileData, UpdateProfileVars>(UPDATE_PROFILE)
    const [updatePassword, updatePasswordResult] = useMutation<UpdatePasswordData, UpdatePasswordVars>(UPDATE_PASSWORD)

    useEffect(() => {
        if (data && !error) {
            const { profile } = data
            setProfile(profile)
        }
    }, [data])

    useEffect(() => {
        const updateData = updateProfileResult?.data
        if (updateData) {
            const { updateProfile } = updateData
            setProfile(updateProfile)
            dispatch(newNotification({
                header: "Profile notification",
                status: NotificationStatusEnum.Successfull,
                content: "Your profile updated !",
                isActive: true
            }))
        }
    }, [updateProfileResult])

    useEffect(() => {
        const updateData = updatePasswordResult?.data
        const updateError = updatePasswordResult?.error
        
        if (updateData) {
            dispatch(newNotification({
                header: "Profile notification",
                status: NotificationStatusEnum.Successfull,
                content: "Your password updated !",
                isActive: true
            }))
        }

        if (updateError) {
            dispatch(newNotification({
                header: "Profile notification",
                status: NotificationStatusEnum.Error,
                content: "Update password failed !, please try again ",
                isActive: true
            }))
        }

    }, [updatePasswordResult])

    const onUpdateProfile = (variables: UpdateProfileVars) => {
        updateProfile({
            variables
        })
    }

    const onUpdatePassword = (variables: UpdatePasswordVars) => {
        updatePassword({
            variables
        })
    }

    return (
        <section className={styles.profile}>
            <Row>
                <Col xs={12} sm={6} md={6} lg={6}>
                    <ProfileInfo
                        profile={profile}
                        onUpdateProfile={onUpdateProfile}
                        onUpdatePassword={onUpdatePassword}
                    />
                </Col>
                <Col xs={12} sm={12} md={12} lg={6}>
                    <div className={styles.avatar}>
                        <h5>Your Avatar</h5>
                        <div className={styles.hr__burning}></div>
                        {loading && (<div className={styles.image_loading}> <EllipsisLoading /> </div>)}
                        <div className={styles.user_image}>
                            <Image src={profile ? profile.image_path : '/'} width={350} height={350} />
                        </div>
                        {/* <div className={styles.avatar_actions}>
                            <button> Change Your Avatar </button>
                        </div> */}
                    </div>
                </Col>
            </Row>
        </section>
    );
}

export default Profile;