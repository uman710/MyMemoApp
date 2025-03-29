package com.minspo.server.app.domain.entity

import com.minspo.server.app.domain.models.Memo
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import java.time.OffsetDateTime

@Entity(name = "memos")
data class MemoEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val title: String,
    val content: String,
    val createdAt: OffsetDateTime = OffsetDateTime.now(),
    @ManyToOne
    @JoinColumn(name = "user_id")
    val user: UserEntity
) {
    fun toModel(): Memo {
        return Memo(
            id = this.id,
            title = this.title,
            content = this.content,
            createdAt = this.createdAt,
            )
    }
}
