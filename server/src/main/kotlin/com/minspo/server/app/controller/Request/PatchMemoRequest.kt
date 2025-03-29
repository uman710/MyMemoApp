package com.minspo.server.app.controller.Request

data class PatchMemoRequest(
    val id: Long,
    val content: String
)
