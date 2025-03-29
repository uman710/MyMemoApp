package com.minspo.server.app.repository

import com.minspo.server.app.domain.entity.MemoEntity
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface MemoRepository: CrudRepository<MemoEntity, Long> {
    fun findAllByUserId(userId: Long): List<MemoEntity>
}