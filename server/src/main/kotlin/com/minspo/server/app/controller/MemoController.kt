package com.minspo.server.app.controller

import com.minspo.server.app.controller.Request.DeleteMemoRequest
import com.minspo.server.app.controller.Request.PatchMemoRequest
import com.minspo.server.app.controller.Request.PostMemoRequest
import com.minspo.server.app.controller.Response.GetMemoResponse
import com.minspo.server.app.controller.Response.PatchMemoResponse
import com.minspo.server.app.controller.Response.PostMemoResponse
import com.minspo.server.app.service.MemoService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/memo")
class MemoController(private val memoService: MemoService) {
    @PostMapping
    fun postMemo(@RequestBody body: PostMemoRequest): PostMemoResponse {
        val userId: Long = 1
        val savedId = memoService.postMemo(userId = userId, body.title, body.content)
        return PostMemoResponse(id = savedId)
    }

    @GetMapping
    fun getMemos():GetMemoResponse {
        val userId: Long = 1
        return memoService.getMemo(userId)
    }

    @PatchMapping
    fun patchMemo(@RequestBody body: PatchMemoRequest): PatchMemoResponse {
        val userId: Long = 1
        val savedId = memoService.patchMemo(userId, body.id, body.content)
        return PatchMemoResponse(savedId)
    }

    @DeleteMapping
    fun deleteMemo(@RequestBody body: DeleteMemoRequest): ResponseEntity<Void> {
        return if (memoService.deleteMemo(body.id)) {
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }
}