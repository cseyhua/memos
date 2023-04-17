package service

import (
	"database/sql"

	"github.com/labstack/echo/v5"
)

type Service struct {
	Db *sql.DB    // 数据库实例
	Eo *echo.Echo // echo实例
}
