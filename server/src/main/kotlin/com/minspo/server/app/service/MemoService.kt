package com.minspo.server.app.service

import com.minspo.server.app.controller.Response.GetMemoResponse
import com.minspo.server.app.domain.entity.MemoEntity
import com.minspo.server.app.repository.MemoRepository
import com.minspo.server.app.repository.UserRepository
import org.springframework.stereotype.Service

interface MemoService {
    fun postMemo(userId: Long, title: String, content: String): Long
    fun getMemo(userId: Long): GetMemoResponse
    fun patchMemo(userId: Long, memoId: Long, content: String): Long
    fun deleteMemo(memoId: Long): Boolean
}

@Service
class DefaultMemoService(
    private val userRepository: UserRepository,
    private val memoRepository: MemoRepository
) : MemoService {
    override fun postMemo(userId: Long, title: String, content: String): Long {
        val userEntity = userRepository.findById(userId).orElseThrow { IllegalArgumentException() }
        val memoEntity = MemoEntity(content = content, title = title, user = userEntity)
        val savedEntity = memoRepository.save(memoEntity)
        return savedEntity.id
    }

    override fun getMemo(userId: Long): GetMemoResponse {
        val memoEntities = memoRepository.findAllByUserId(userId)
        val memos = memoEntities.map { it.toModel() }
        val getMemoResponse = GetMemoResponse(memos = memos)
        return getMemoResponse
    }

    override fun patchMemo(userId: Long, memoId: Long, content: String): Long {
        val userEntity = userRepository.findById(userId).orElseThrow { IllegalArgumentException() }
        val memoEntity = memoRepository.findById(memoId).orElseThrow { IllegalArgumentException() }
        val newMemoEntity = MemoEntity(id = memoId, content = content, title = memoEntity.title, user = userEntity)
        val savedEntity = memoRepository.save(newMemoEntity)
        return savedEntity.id
    }

    override fun deleteMemo(memoId: Long): Boolean {
        try {
            memoRepository.findById(memoId).orElseThrow { IllegalArgumentException() }
            memoRepository.deleteById(memoId)
            return true
        } catch (e: Exception) {
            return false
        }
    }
}