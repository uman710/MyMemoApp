package com.minspo.server.app.domain.entity

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id

@Entity(name = "users")
data class UserEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val username: String,
    val oid: String,  //Azureアカウント識別
)
