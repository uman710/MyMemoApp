package com.minspo.server.app.controller.Response

import com.minspo.server.app.domain.models.Memo

data class GetMemoResponse (
   val memos: List<Memo>
)