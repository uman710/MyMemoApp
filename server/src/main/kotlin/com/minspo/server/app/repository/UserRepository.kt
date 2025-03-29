package com.minspo.server.app.repository

import com.minspo.server.app.domain.entity.UserEntity
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository: CrudRepository<UserEntity, Long> {}