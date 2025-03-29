package com.minspo.server.app.domain.models

import java.time.OffsetDateTime

data class Memo (
    val id: Long,
    val title: String,
    val content: String,
    val createdAt: OffsetDateTime,
)