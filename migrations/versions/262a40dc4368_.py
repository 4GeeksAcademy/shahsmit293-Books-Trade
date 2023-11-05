"""empty message

Revision ID: 262a40dc4368
Revises: 1e7b1bb43cdf
Create Date: 2023-11-04 13:33:40.847449

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '262a40dc4368'
down_revision = '1e7b1bb43cdf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('conversation',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('sender_id', sa.Integer(), nullable=False),
    sa.Column('receiver_id', sa.Integer(), nullable=False),
    sa.Column('message', sa.String(length=4000), nullable=False),
    sa.ForeignKeyConstraint(['receiver_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['sender_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('conversation')
    # ### end Alembic commands ###
