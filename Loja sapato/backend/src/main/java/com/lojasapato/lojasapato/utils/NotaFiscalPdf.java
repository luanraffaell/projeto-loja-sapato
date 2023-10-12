package com.lojasapato.lojasapato.utils;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.lojasapato.lojasapato.api.model.ItemDTO;
import com.lojasapato.lojasapato.api.model.PedidoResponseDTO;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Service
public class NotaFiscalPdf {

    public byte[] createNotaFiscalPdf(PedidoResponseDTO pedido) throws DocumentException, IOException {
        Document document = new Document(PageSize.A4);
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        PdfWriter.getInstance(document,byteArrayOutputStream);
        document.open();
        Image imageLogo = Image.getInstance("src/main/resources/logo.png");
        imageLogo.scaleAbsolute(500f, 100f);

        document.add(imageLogo);

        Font font = FontFactory.getFont(FontFactory.COURIER, 25, BaseColor.BLACK);
        Paragraph chunk = new Paragraph("Nota fiscal",font);
        chunk.setSpacingBefore(15f);
        document.add(chunk);

        Paragraph paragraphWithSpacingBefore = new Paragraph();
        paragraphWithSpacingBefore.setSpacingBefore(10.0f);
        PdfPTable table = new PdfPTable(5);

        table.setWidthPercentage(100);
        table.setWidths(new float[] { 1, 2,1,2,2 });

        Font fontCell = FontFactory.getFont(FontFactory.HELVETICA,15,BaseColor.WHITE);
        PdfPCell cell = new PdfPCell(new Paragraph("Código",fontCell));
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setBackgroundColor(BaseColor.BLACK);
        cell.setPadding(5f);
        table.addCell(cell);

        cell = new PdfPCell(new Paragraph("Produto",fontCell));
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setBackgroundColor(BaseColor.BLACK);
        cell.setPadding(5f);
        table.addCell(cell);

        cell = new PdfPCell(new Paragraph("Qtd",fontCell));
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setBackgroundColor(BaseColor.BLACK);
        cell.setPadding(5f);
        table.addCell(cell);

        cell = new PdfPCell(new Paragraph("Preço unitário",fontCell));
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setBackgroundColor(BaseColor.BLACK);
        cell.setPadding(5f);
        table.addCell(cell);

        cell = new PdfPCell(new Paragraph("Preço Total",fontCell));
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setBackgroundColor(BaseColor.BLACK);
        cell.setPadding(5f);
        table.addCell(cell);

        for(ItemDTO item: pedido.getItems()){
            table.addCell(createCenterAlignedCell(String.valueOf(item.getProdutoDTO().getId())));
            table.addCell(createCenterAlignedCell(String.valueOf(item.getProdutoDTO().getNome())));
            table.addCell(createCenterAlignedCell(String.valueOf(item.getQuantidade())));
            table.addCell(createCenterAlignedCell("R$"+String.valueOf(item.getPrecoUnitario())));
            table.addCell(createCenterAlignedCell("R$"+String.valueOf(item.getPrecoTotal())));
        }
        paragraphWithSpacingBefore.add(table);
        document.add(paragraphWithSpacingBefore);
        //***********************************

        PdfPTable mainTable = new PdfPTable(2);
        mainTable.setWidthPercentage(100);

        Font fontSummary = FontFactory.getFont(FontFactory.HELVETICA,15,Font.BOLD,BaseColor.BLACK);
        PdfPTable accounts = new PdfPTable(2);
        accounts.setSpacingBefore(15.0f);
        accounts.setWidthPercentage(49);
        accounts.setHorizontalAlignment(Element.ALIGN_LEFT);
        PdfPCell accountCell = new PdfPCell(new Paragraph("Data:",fontSummary));
        accounts.addCell(accountCell);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss", new Locale("pt", "BR"));

        accounts.addCell(pedido.getData().format(formatter));

        accountCell = new PdfPCell(new Paragraph("Protocolo:",fontSummary));
        accounts.addCell(accountCell);
        accounts.addCell(pedido.getProtocolo());

        accountCell = new PdfPCell(new Paragraph("Vendedor:",fontSummary));
        accounts.addCell(accountCell);
        accounts.addCell(pedido.getFuncionario().getNome());

        accountCell = new PdfPCell(new Paragraph("Sub total:",fontSummary));
        accounts.addCell(accountCell);
        accounts.addCell("R$"+String.valueOf(pedido.getValorTotal()));

        accountCell = new PdfPCell(new Paragraph("Desconto:",fontSummary));
        accounts.addCell(accountCell);
        accounts.addCell("R$"+String.valueOf(0));

        accountCell = new PdfPCell(new Paragraph("Valor final:",fontSummary));
        accounts.addCell(accountCell);
        accounts.addCell("R$"+String.valueOf(pedido.getValorTotal()));


        PdfPTable accounts2 = new PdfPTable(2);
        accounts2.setSpacingBefore(15.0f);
        accounts2.setWidthPercentage(49);
        accounts2.setHorizontalAlignment(Element.ALIGN_RIGHT);
        PdfPCell accountCell2 = new PdfPCell(new Paragraph("Pagamento:",fontSummary));
        accounts2.addCell(accountCell2);
        accounts2.addCell(pedido.getFormaPagamento());

        accountCell2 = new PdfPCell(new Paragraph("Status:",fontSummary));
        accounts2.addCell(accountCell2);
        accounts2.addCell(pedido.getStatusPedido());

        PdfPCell cell1 = new PdfPCell(accounts);
        cell1.setBorder(PdfPCell.NO_BORDER);
        mainTable.addCell(cell1);

        PdfPCell cell2 = new PdfPCell(accounts2);
        cell2.setBorder(PdfPCell.NO_BORDER);
        mainTable.addCell(cell2);

        document.add(mainTable);

        document.close();
        return byteArrayOutputStream.toByteArray();
    }
    private static PdfPCell createCenterAlignedCell(String content) {
        PdfPCell cell = new PdfPCell(new Paragraph(content));
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        return cell;
    }
}
